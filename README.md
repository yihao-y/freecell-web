# FreeCell Web

An open-source, browser-based FreeCell game with Microsoft-compatible numbered deals, an Expert deal filter, touch controls, solution replay, history and personal statistics.

Play online (after GitHub Pages is enabled): https://yihao-y.github.io/freecell-web/

## Features

- Play by mouse or touch; smart tap moves, drag moves and undo/redo
- Classic numbered FreeCell deals; optional Expert selection
- Reference solution replay for supported deals
- Finished-game history, time statistics and trend charts
- Browser-local autosaving with an IndexedDB secondary snapshot
- JSON history export/import; offline PWA after an initial online visit

## Saving and backups

Game records stay in your browser under the same website origin; this site has no account and no remote database. It stores them in localStorage (existing key `freecell-practice-v1`) with an IndexedDB snapshot. Neither protects against clearing site data or losing the device.

**Before moving from a previously downloaded local HTML file:** open the previous copy, use **历史 → 导出备份 JSON**, then open this hosted site and use **历史 → 导入备份**. Keep the exported JSON in a separate safe location. Browser storage is not synchronized across browsers or devices.

To reduce accidental browser eviction, use **历史 → 加强本地存储保护** when supported. This does not prevent manual deletion.

## Publishing / updating

Host the root of this repository through **Settings → Pages → Deploy from a branch → main → /(root)**.

Updates should keep the same URL and the same storage keys. When updating PWA assets, bump the internal `CACHE_VERSION` in `sw.js`. Do not host future versions on different origins.

Some data sources for Expert filtering and solutions require a network connection on first use. Consult [Third-party notices](THIRD_PARTY_NOTICES.md).

## License

Original project code: MIT (see [LICENSE](LICENSE)). Third-party data and solution sources retain their own notices and licenses.