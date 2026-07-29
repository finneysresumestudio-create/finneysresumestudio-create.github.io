# QR Codes

These QR codes point to **https://finneysresumestudio-create.github.io/**

## No expiry, no limits, no tracking

These are **static** QR codes. The website address is encoded directly into the
pattern itself, so:

* They **never expire** and have **no scan limit**.
* There is **no third-party service** in the middle, so nothing can start
  charging, rate-limiting, or shutting the code off.
* **Nobody is tracking scans** (the flip side: there are no scan analytics).
* They work offline forever. As long as the website address stays the same,
  these images keep working.

> The one trade-off: because the URL is baked in, the destination cannot be
> changed later. If the site ever moves to a different address (for example a
> custom domain like `finneysresumestudio.com`), regenerate these files.

## Which file to use

| File | Best for |
| --- | --- |
| `finneys-qr.svg` | **Print** (business cards, flyers, posters). Vector, scales to any size with no quality loss. Give this to a printer. |
| `finneys-qr-transparent.svg` | Print over a colored or textured background. |
| `finneys-qr.png` | **Digital** use: email signature, slides, social posts. 1,640 px, brand navy. |
| `finneys-qr-black.png` | Maximum compatibility: pure black on white, for low-quality printing, faxes, or photocopies. |
| `finneys-qr-branded.png` | **Marketing pieces** where you want the logo shown. Uses high error correction so the centered logo does not affect scanning. |
| `finneys-qr.eps` | Legacy print workflows that require EPS. |

## Printing guidelines

* **Minimum printed size: 0.8 in / 2 cm** across. Bigger is safer.
* Always keep the **white margin** (quiet zone) around the code. Do not crop it
  or place text right against the edge.
* Keep **dark code on a light background**. Do not invert it.
* Do not stretch it. Scale width and height together.
* Test-scan the final printed piece before ordering a large run.

## Regenerating

If the website address ever changes, regenerate with
[segno](https://pypi.org/project/segno/):

```bash
pip install segno
python -c "import segno; segno.make('https://YOUR-NEW-URL/', error='m').save('finneys-qr.svg', scale=16, border=4, dark='#0f3460')"
```
