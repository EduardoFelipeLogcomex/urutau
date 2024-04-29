import HTTP, { HttpHeader, HttpMethod, HttpRequestError, MakeHTTP } from './http.protocol.ts'

export const MakeXMLHttpRequestAdapter: MakeHTTP = (): HTTP => {
	return new XmlHttpRequestAdapter()
}

class XmlHttpRequestAdapter implements HTTP {
  private headers: HttpHeader = {}
  private baseURL = String()
  public useDefaultHeaders = true

  private readonly defaultHeaders = {
    'Content-type': 'Application/json',
    'User-Email': localStorage.getItem('email') || '',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }

  setHeaders(headers: HttpHeader): void {
    this.headers = { ...headers }
  }

  getDefaultHeaders(): HttpHeader {
    return { ...this.defaultHeaders }
  }

  changeBaseUrl(url: string): void {
    this.baseURL = url
  }

  request<Response, Payload = {}>(method: HttpMethod, url: string, payload?: Payload): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, `${this.baseURL}${url}`)
      xhr.responseType = 'json'

      if (this.useDefaultHeaders) {
        this.headers = { ...this.headers, ...this.defaultHeaders }
      }

      if (Object.keys(this.headers).length) {
        for (const [headerProperty, headerValue] of Object.entries(this.headers)) {
          xhr.setRequestHeader(headerProperty, headerValue)
        }
      }

      xhr.onload = () => {
        const { status, response } = xhr

        if (status >= 200 && status <= 299) {
          resolve(response as Response)
        } else {
          reject({ status, response } as HttpRequestError)
        }
      }

      xhr.onerror = () => {
        const { status, response } = xhr
        reject({ status, response } as HttpRequestError)
      }

      if (method === 'GET' || !payload) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(payload))
      }
    })
  }
}
