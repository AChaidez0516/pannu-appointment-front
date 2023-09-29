import Image from 'next/image'

function FaceDetect() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ textAlign: 'center' }}>Face recognition</p>
          <Image src="/assets/images/ico-face.png" width="130" height="130" />
        </div>
      </div>
      <div style={{ height: 2, background: '#99A0B1', marginTop: 30 }}></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ textAlign: 'center' }}>Face recognition</p>
          <Image src="/assets/images/ico-fingerprinter.png" width="122" height="122" />
        </div>
      </div>
    </>
  )
}

export default FaceDetect
