declare module 'json-server' {
    import { RequestHandler, Router } from 'express';
    
    export interface JsonServer {
      router: (filename: string) => Router;
      defaults: () => RequestHandler[];
      rewriter: (rules: object) => RequestHandler;
      bodyParser: RequestHandler;
    }
  
    const jsonServer: JsonServer;
    export default jsonServer;
  }
  