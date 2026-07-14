import os
import re

# Read bundle.js step content
src_path = '/Users/mac/.gemini/antigravity-ide/brain/4a793609-48a0-427f-81ed-1021d1ad4657/.system_generated/steps/150/content.md'
with open(src_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Clean markdown header
js_content = text
# If there are code fences, extract javascript
js_blocks = re.findall(r'```(?:javascript|js)\n(.*?)\n```', text, re.DOTALL)
if js_blocks:
    js_content = js_blocks[0]
else:
    # Try filtering out standard metadata lines
    lines = text.split('\n')
    filtered = []
    for line in lines:
        if line.startswith('Title:') or line.startswith('Description:') or line.startswith('Source:') or line.startswith('---'):
            continue
        filtered.append(line)
    js_content = '\n'.join(filtered)

# Append print function
js_content += """
try {
  for (let i = 0; i < 2000; i++) {
    try {
      const val = _0x34dc(i);
      if (val && val.trim()) {
        console.log('DEC:' + i + '->' + val);
      }
    } catch(e) {}
  }
} catch(e) {
  console.error(e);
}
"""

os.makedirs('/Users/mac/Documents/training/thiepcuoionline/scratch', exist_ok=True)
dest_path = '/Users/mac/Documents/training/thiepcuoionline/scratch/decode.js'
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Created decode.js at:", dest_path)
