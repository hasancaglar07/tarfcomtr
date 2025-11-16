import { ImageResponse } from 'next/og'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FF8C00',
          borderRadius: 12,
          color: '#FFFFFF',
          fontSize: 40,
          fontWeight: 700,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        T
      </div>
    ),
    {
      ...size,
    }
  )
}
