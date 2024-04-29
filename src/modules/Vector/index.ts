class Vec2 {
	public x: number = 0
	public y: number = 0
}

class Vec4 {
	public x: number = 0
	public y: number = 0
	public w: number = 0
	public h: number = 0
}

function _Vec4Intersects(vecX: Vec4, vecY: Vec4): boolean {
	if (vecY.x >= vecX.x && vecY.x <= vecX.w) {
		if (vecY.y >= vecX.y && vecY.y <= vecX.h) {
			return true
		}
	}

	return false
}

export namespace Vector {
	export const MakeVec2 = (): Vec2 => new Vec2()
	export const MakeVec4 = (): Vec4 => new Vec4()
	export const Vec4Intersects = _Vec4Intersects

	export interface Vec4 {
		x: number
		y: number
		w: number
		h: number
	}
}
