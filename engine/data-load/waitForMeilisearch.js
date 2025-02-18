import http from 'http';

export async function waitForMeilisearch() {
    
    let url = 'http://localhost:7701/health';
    let timeout = 30000;
    let interval = 1000;

    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        try {
            const response = await new Promise((resolve, reject) => {
                const req = http.get(url, (res) => {
                    let data = '';
                    res.on('data', chunk => data += chunk);
                    res.on('end', () => resolve(JSON.parse(data)));
                });
                req.on('error', reject);
            });
            
            if (response.status === "available") {
                console.log("Meilisearch is ready!");
                return;
            }
        } catch (error) {
            // Suppress errors and retry
        }
        
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    throw new Error("Meilisearch did not become available within the timeout period");
}
