import { HexColor } from '../../types.ts'

export interface RGB {
	r: number
	g: number
	b: number
}

export const MakeColorRGBA = (r: number, g: number, b: number, a: number = 1): Color => {
	return new Color(r, g, b, a, null)
}

export const MakeColorHex = (hex: HexColor): Color => {
	const rgb = Color.hexToRgb(hex)
	return new Color(rgb.r, rgb.g, rgb.b, 1, hex)
}

class Color {
	private readonly _r: number = 0
	private readonly _g: number = 0
	private readonly _b: number = 0
	private readonly _a: number = 0
	private _hex: HexColor
	private _isLight: boolean

	constructor(r: number, g: number, b: number, a: number, hex: HexColor | null) {
		this._r = r
		this._g = g
		this._b = b
		this._a = a

		if (!hex) {
			this._hex = Color.rgbToHex(r, g, b)
		} else {
			this._hex = hex
		}

		this._isLight = (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255) < 0.5
	}

	get r(): number {
		return this._r;
	}

	get g(): number {
		return this._g;
	}

	get b(): number {
		return this._b;
	}

	get a(): number {
		return this._a;
	}

	get isLight(): boolean {
		return this._isLight;
	}

	toString(): string {
		return this._hex
	}

	public static rgbToHex(r: number, g: number, b: number): string {
		let red = r.toString(16)
		let green = g.toString(16)
		let blue = b.toString(16)

		if (red.length == 1) red = '0' + red
		if (green.length == 1) green = '0' + green
		if (blue.length == 1) blue = '0' + blue

		return '#' + red + green + blue
	}

	public static hexToRgb(hex: HexColor): RGB {
		hex = hex.replace(/^#/, '')

		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
		}

		const num = parseInt(hex, 16)

		return {
			r: num >> 16,
			g: (num >> 8) & 255,
			b: num & 255
		}
	}
}
