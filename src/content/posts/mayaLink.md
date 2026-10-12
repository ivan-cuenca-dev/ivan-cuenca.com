---


author: Iván Cuenca Ruiz

date: 2026-10-12

title: Maya link VSCode extension

thumbnail: /images/posts/mayaLink/thumbnail.png

excerpt: Connect to Autodesk Maya from VS Code and send Python code straight to the Script Editor.

tags: [VSCode]
---

<img class="img-small" src="/images/posts/mayaLink/thumbnail.png" alt="Maya link logo">


# Maya Link

I usually have a few instances open at once, and the extensions I used could only send code to one. Another issue I faced was needing both VS Code and the Script Editor open to check the output or errors which takes up a lot of screen space.

Maya Link does both. It is a VS Code extension that connects to Autodesk Maya over `maya.cmds.commandPort`. You can see your open instances in the sidebar, watch the Script Editor output in a terminal, and send Python code straight to Maya.

<br>

# Setup

1. Install the **Maya Link** extension in VS Code.
2. Run the command **Maya Link: Copy Setup Script** from the Command Palette (`Ctrl+Shift+P`).
3. Paste the snippet into Maya's Script Editor (Python tab) and run it.
4. Click the Maya Link icon in the Activity Bar to open the panel.

<br>

# The panel

The sidebar panel automatically scans ports **7000–7100** and lists every Maya instance it finds. Each entry shows the port, the scene name and the Maya version.

Click an instance to connect to it. Only one instance can be connected at a time, and the choice is stored per workspace — so it survives window reloads.

Each card has a console icon that opens a terminal showing that instance's Script Editor output. You can open as many consoles as you need — one per Maya. On Linux and macOS they are read-only: select and copy as normal. On Windows, `Ctrl+C` stops a console and anything you type runs.

The target icon on each card sends a ping to that Maya, so you can verify it's the right instance before connecting.

Use the refresh button in the panel title bar to rescan for new instances.

<br>

# Sending code

With an instance connected, open a Python file in VS Code and run **Maya Link: Send Python to Maya** from the Command Palette. 

- If you have a selection, only the selected code is sent.
- If nothing is selected, the whole file is sent.

You can also bind the command to a keyboard shortcut — go to **File → Preferences → Keyboard Shortcuts** and search for `Maya Link: Send Python to Maya`.

The code is wrapped in a `try/except` block before being sent, so any error traceback is printed directly in Maya's Script Editor — right where you can read and debug it.

<br>

# Running Maya at startup

Instead of pasting the setup script into the Script Editor every time, you can save it in a `userSetup.py` file in your Maya scripts directory. Maya will run it automatically on startup, so the command port is always open and ready to connect.

<br>

# Links

- [GitHub repository](https://github.com/ivan-cuenca-dev/maya-link)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=IvanCuenca.maya-link)

