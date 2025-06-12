export type BaseOptions = {
  port?: number;
  error?: never;
  request?: never;
  [key: string]: unknown;
};

export type RequestHandlerParameters<Options extends BaseOptions> = Omit<
  Options,
  "error" | "request"
> & {
  request: Request;
};

export type RequestHandler<Options extends BaseOptions> = (
  params: RequestHandlerParameters<Options>
) => Response | Promise<Response>;

export type JsonRequestHandler<
  Options extends BaseOptions,
  Payload = unknown,
  Data = unknown
> = (
  params: RequestHandlerParameters<Options> & { payload: Payload }
) => Data | Promise<Data>;

export type FetchResult<Data = unknown> = {
  response: Response;
  data: Data;
};

export type Endpoint = Partial<Record<Method, EndpointData>>;

export type Method = "GET" | "POST";

export type EndpointData = {
  accepts?: unknown;
  result?: unknown;
};
