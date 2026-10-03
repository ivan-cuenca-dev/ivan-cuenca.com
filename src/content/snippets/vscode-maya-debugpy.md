---
title: Connect VSCode Debugger to Maya
description: Debug Python scripts in Maya using VSCode and debugpy
tags: [VSCode, Maya]
---

## 1. Install debugpy in Maya
Run this script inside maya to install debugpy package.
```python
import subprocess, sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "debugpy"])
```

## 2. Create `.vscode/launch.json`
In the debug and run tab inside VSCode select the option to create a launch.json file, this will create a .vscode folder in your project and inside the launch.json file you can add this configuration. <br>
You can add more configurations if you need to be able to connect to multiple mayas.
```json
{
    "version": "0.2.0",
    "configurations": [{
        "name": "Attach to Maya",
        "type": "python",
        "request": "attach",
        "connect": { 
            "host": "localhost", 
            "port": 5678 
            }
    }]
}
```

## 3. Open a debugpy port in Maya

```python
import debugpy
debugpy.listen(("localhost", 5678))
```

## 4. Attach VSCode

Press `F5` or go to `Run and debug` and press the play button in VSCode with your script open. Set breakpoints and debug.
