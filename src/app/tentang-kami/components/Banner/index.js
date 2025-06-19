'use client';

export default function Index() {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        minHeight: '74vh',
        backgroundImage: "url('https://placehold.co/800x600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '3rem 0'
      }}>
      {/* Overlay hitam semi transparan */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50" />

      <div className="container position-relative z-2 px-3 px-md-5">
        <div className="bg-white text-black rounded-3 shadow p-4 text-center animate__animated animate__fadeIn">
          <h3 className="lead text-primary mb-2">MISI KAMI</h3>
          <h1 className="display-6 fw-bold lh-base">
            Mewujudkan platform sewa properti <strong className="text-primary">terdepan</strong>{' '}
            yang menghubungkan
            <strong className="text-success"> jutaan orang</strong> secara
            <strong className="text-info"> efisien</strong>, dan
            <strong className="text-danger"> terpercaya</strong> di seluruh Indonesia.
          </h1>
        </div>
      </div>
    </section>
  );
}
