// import (Request, Response, NextFunction) from "express";

// type RateLimitData = {
//     count: number;
//     firstRequest: number;
// }

// const rateLimit = (limit: number, interval: number) => {
//     const request = new Map<string, RateLimitData>();

//     return (req: Request, res: Response, next: NextFunction) => {
//         const ip = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress;

//         if (!request.has(ip)){
//             request.set(ip, {count:0, firstRequest: Date.now()})
//         }

//         const data = request.get(ip);

//         if (Date.now()-data.firstRequest > interval){
//             data.count = 0;
//             data.firstRequest = Date.now();
//         }

//         data.count += 1

//         if (data.count > limit) {
//             return res.status(429).send("Too many requests, please try again later.");
//         }

//         request.set(ip, data);
//         next();
//     }
// }

// export default rateLimit
