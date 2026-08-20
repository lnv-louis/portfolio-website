from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1400, "height": 900})

    logs = []
    def on_console(msg):
        logs.append(f"{msg.type}: {msg.text}")
    page.on("console", on_console)
    page.on("pageerror", lambda err: logs.append(f"pageerror: {err.message}"))

    page.goto("http://localhost:3000")
    page.wait_for_timeout(8000)

    page.screenshot(path="/Users/louiss/Programming/Projects/portfolio-website/scripts/debug-pdf-full.png", full_page=True)

    pdf_viewer = page.query_selector('[data-slot="pdf-viewer"]')
    if pdf_viewer:
        box = pdf_viewer.bounding_box()
        print("PDF viewer bounding box:", json.dumps(box))
        size = pdf_viewer.evaluate("el => ({ w: el.clientWidth, h: el.clientHeight })")
        print("PDF viewer client size:", size)
    else:
        print("PDF viewer not found")

    scroll_viewport = page.query_selector('[data-slot="scroll-area-viewport"]')
    if scroll_viewport:
        box = scroll_viewport.bounding_box()
        print("Scroll viewport bounding box:", json.dumps(box))
        size = scroll_viewport.evaluate("el => ({ w: el.clientWidth, h: el.clientHeight })")
        print("Scroll viewport client size:", size)
    else:
        print("Scroll viewport not found")

    scroll_content = page.query_selector('[data-slot="pdf-viewer-scroll-content"]')
    if scroll_content:
        box = scroll_content.bounding_box()
        print("PDF scroll content bounding box:", json.dumps(box))
    else:
        print("PDF scroll content not found")

    # Count canvas and page elements
    page_count = page.evaluate("() => document.querySelectorAll('[data-pdf-viewer-page]').length")
    canvas_count = page.evaluate("() => document.querySelectorAll('canvas').length")
    print("PDF page elements:", page_count)
    print("Canvas elements:", canvas_count)

    print("--- Console logs ---")
    print("\n".join(logs))

    browser.close()
