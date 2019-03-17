# Create a language extension

## Create .tmLanguage files

This file provides syntax highlighting rules by matching literals and tokens using RegExp

- [list of tokens](https://gist.github.com/vivainio/b89bd60a3f2c7bbb31f7e149d6cb8806)

Most common tokens:

- `header`
- `comment`
- `constant.numeric`
- `constant.rgb-value`
- `keyword`
- `keyword.operator`
- `string`
- `string.value`
- `string.regexp`
- `entity.name.tag`
- `entity.name.function`
- `entity.name.class`
- `entity.other.attribute-name`

A simple extension example can be found [here](https://github.com/gctse/syntax-highlighting-VS-Code-example)

Here is a sample `.tmLanguage` to match a `.log` file for:

info-token:

- `hint`
- `info`
- `information`

error-token:

- `Error`
- `Failure`
- `Fail`

And so on...

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>scopeName</key>
        <string>text.log</string>

        <key>fileTypes</key>
        <array>
            <string>log</string>
        </array>

        <key>name</key>
        <string>Log file</string>

        <key>patterns</key>
        <array>
            <dict>
                <key>match</key>
                <string>\b(?i:(hint|info|information))\b</string>
                <key>name</key>

                <string>info-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b(?i:(warning|warn))\b</string>
                <key>name</key>
                <string>warn-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b(?i:(Error|Failure|Fail))\b</string>
                <key>name</key>
                <string>error-token</string>
            </dict>
            <dict>
                <key>match</key>
                <string>\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\b</string>
                <key>name</key>
                <string>constant.numeric</string>
            </dict>
        </array>
        <key>uuid</key>
        <string>FF0550E0-3A29-11E3-AA6E-0800200C9A77</string>
    </dict>
</plist>
```
