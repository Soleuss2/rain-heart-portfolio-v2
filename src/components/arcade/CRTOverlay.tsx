import { useFx } from '../../hooks/useFx'

export default function CRTOverlay() {
  const { level } = useFx()

  if (level === 'off') return null

  return (
    <div className="crt" aria-hidden="true">
      {level === 'on' && <div className="crt-noise" />}
      <div className="crt-scanlines" />
      {level === 'on' && <div className="crt-roll" />}
      <div className="crt-vignette" />
    </div>
  )
}