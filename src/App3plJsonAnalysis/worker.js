// worker.js

self.onmessage = (event) => {
    const { rows, startIndex, CHUNK_SIZE } = event.data;
    const endIndex = Math.min(startIndex + CHUNK_SIZE, rows.length);
  
    // Process chunk
    const chunk = rows.slice(startIndex, endIndex).map((row, index) => ({
      id: startIndex + index + 1,
      "Message Id": row[0],
      "Legal entity": row[1],
      "Interface name": row[2],
      Flow: row[3],
      "Key field": row[4],
      "Response status": row[5],
      "CS Remark": row[6],
      "CS Progress Status": row[7],
      "Log description": row[8],
      "Payload JSON": row[9] ? safeJsonParse(row[9]) : {},
      "Response date and time": row[10],
      "Created by": row[11],
      "Modified by": row[12],
      "Modified date and time": row[13],
    }));
  
    // Return processed chunk back to main thread
    self.postMessage({ chunk, startIndex, endIndex });
  };
  
  const safeJsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Invalid JSON in payload:", error);
      return {}; // Return empty object for invalid JSON
    }
  };
  