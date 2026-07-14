import os
import re

# Read bundle.js step content
src_path = '/Users/mac/.gemini/antigravity-ide/brain/4a793609-48a0-427f-81ed-1021d1ad4657/.system_generated/steps/150/content.md'
with open(src_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Extract javascript block
js_blocks = re.findall(r'```(?:javascript|js)\n(.*?)\n```', text, re.DOTALL)
if js_blocks:
    js_content = js_blocks[0]
else:
    lines = text.split('\n')
    filtered = []
    for line in lines:
        if line.startswith('Title:') or line.startswith('Description:') or line.startswith('Source:') or line.startswith('---'):
            continue
        filtered.append(line)
    js_content = '\n'.join(filtered)

# Expose _0x34dc to global scope
# We find: function _0x34dc(_0x54ab8c,_0x55bdca)
# And replace with: global._0x34dc = _0x34dc; function _0x34dc(_0x54ab8c,_0x55bdca)
exposed_js = js_content.replace(
    'function _0x34dc(_0x54ab8c,_0x55bdca){',
    'function _0x34dc(_0x54ab8c,_0x55bdca){ global._0x34dc = _0x34dc;'
)

dest_path = '/Users/mac/Documents/training/thiepcuoionline/scratch/bundle_exposed.js'
os.makedirs(os.path.dirname(dest_path), exist_ok=True)
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(exposed_js)

print("Created bundle_exposed.js")
