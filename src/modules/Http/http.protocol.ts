export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface HttpHeader {
  [header: string]: string
}

export interface HttpRequestError {
  status: number
  response: any
}

export default interface HTTP {
  useDefaultHeaders: boolean
  setHeaders(headers: HttpHeader): void
  getDefaultHeaders(): HttpHeader
  changeBaseUrl(url: string): void
  request<Response, Payload = {}>(method: HttpMethod, url: string, payload?: Payload): Promise<Response>
}

export interface MakeHTTP {
	(): HTTP
}
