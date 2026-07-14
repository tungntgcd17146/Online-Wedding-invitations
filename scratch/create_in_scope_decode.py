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

# Find the last '})();' in the js content and replace it with probe
# Let's search from the end
r_idx = js_content.rfind('})();')
if r_idx != -1:
    probe = """
  // PROBE START
  try {
    for (let i = 0x0; i < 0x800; i++) {
      try {
        const val = _0x34dc(i);
        if (val && val.trim()) {
          console.log('PROBE_DEC:' + i + '->' + val);
        }
      } catch(e) {}
    }
  } catch(e) {
    console.error(e);
  }
  // PROBE END
})();
"""
    js_content = js_content[:r_idx] + probe
    print("Injected probe successfully!")
else:
    print("Could not find closing })(); to inject probe.")

dest_path = '/Users/mac/Documents/training/thiepcuoionline/scratch/decode_in_scope.js'
os.makedirs(os.path.dirname(dest_path), exist_ok=True)
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Created decode_in_scope.js at:", dest_path)
