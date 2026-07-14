try {
  // Run the exposed bundle script
  require('./bundle_exposed.js');
  
  console.log("Bundle loaded. Starting decryption...");
  
  if (typeof global._0x34dc === 'function') {
    for (let i = 0; i < 2000; i++) {
      try {
        const val = global._0x34dc(i);
        if (val && val.trim()) {
          console.log(`PROBE_DEC:${i}->${val}`);
        }
      } catch (e) {
        // ignore decryption error for invalid keys
      }
    }
  } else {
    console.error("global._0x34dc is not a function!");
  }
} catch (e) {
  console.error("Error executing:", e);
}
