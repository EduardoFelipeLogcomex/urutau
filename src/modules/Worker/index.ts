export namespace Worker {
	export function Make (callback: Function, timeout: number = 5000): void {
		let t = 0

		const worker = setInterval(() => {
			if (t > timeout) {
				clearInterval(worker)
				return
			}

			callback(worker)

			t += 100
		}, 100)
	}

	export function MakeHighResolution (callback: Function, timeout: number = 1000): void {
		let t = 0

		const worker = setInterval(() => {
			if (t > timeout) {
				clearInterval(worker)
				return
			}

			callback(worker)

			t += 10
		}, 10)
	}

	export function Clear (worker: any): void {
		clearInterval(worker)
	}
}
