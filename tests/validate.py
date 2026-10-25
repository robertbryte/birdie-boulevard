#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re, sys

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.assets, self.tags = set(), [], [], []
        self.form_actions, self.buttons = [], []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs); self.tags.append(tag)
        if data.get("id"): self.ids.add(data["id"])
        if tag == "a" and data.get("href"): self.links.append(data["href"])
        if tag in {"img", "script", "link", "source", "video"}:
            for key in ("src", "href", "poster"):
                value = data.get(key)
                if value: self.assets.append(value)
        if tag == "form": self.form_actions.append(data.get("action"))
        if tag == "button": self.buttons.append(data)

failures = []
def check(condition, message):
    if not condition: failures.append(message)

text = HTML.read_text(encoding="utf-8")
p = SiteParser(); p.feed(text)
check("main" in p.tags and "header" in p.tags and "footer" in p.tags, "semantic header/main/footer missing")
check(p.tags.count("h1") == 1, "page must contain exactly one h1")
check(p.tags.count("details") >= 8, "at least eight native FAQ details required")
check('aria-controls="site-nav"' in text and 'aria-expanded="false"' in text, "accessible menu attributes missing")
check("no-js" in text and ".no-js .reveal" in (ROOT/"styles.css").read_text(), "no-JS reveal fallback missing")
for href in p.links:
    if href.startswith("#"):
        check(href[1:] in p.ids, f"missing anchor target: {href}")
    elif not urlparse(href).scheme and not href.startswith(("mailto:", "tel:")):
        check((ROOT / href.split("?",1)[0]).exists(), f"missing local link: {href}")
for asset in p.assets:
    if asset.startswith(("http://", "https://", "data:")): continue
    local = asset.split("?",1)[0]
    check((ROOT / local).exists(), f"missing asset: {asset}")
check(all(action in (None, "") for action in p.form_actions), "preview form must not have a submission action")
check("event.preventDefault()" in (ROOT/"script.js").read_text(), "preview form must prevent submission")
check("Preview only" in text and "nothing was sent" in (ROOT/"script.js").read_text(), "preview-only form disclosure missing")
for required in ["$550", "$950", "$1,200", "12′ W × 9′ H × 7′ D", "12′ W × 9′ H × 20′ D", "SkyTrak ST+", "4K"]:
    check(required in text, f"required fact absent: {required}")
check(text.count("Featured") >= 1 and "4 hours" in text, "featured 4-hour package missing")
check("Pro Shop" not in text, "optional Pro Shop must remain disabled")
check(not list(ROOT.rglob(".git/**/*:Zone.Identifier")), "Zone.Identifier file found under .git")
check("*:Zone.Identifier" in (ROOT/".gitignore").read_text(), "Zone.Identifier ignore rule missing")
check(len(p.ids) == len(re.findall(r'\bid="([^"]+)"', text)), "duplicate IDs detected")

if failures:
    print(f"FAIL ({len(failures)} checks)")
    for failure in failures: print(f" - {failure}")
    sys.exit(1)
print("PASS: HTML structure, anchors, local assets, required facts, FAQ, no-JS fallback, preview form, and ignore rules validated.")
