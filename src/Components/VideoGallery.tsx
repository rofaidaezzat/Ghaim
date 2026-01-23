import vid1 from "../assets/video_2026-01-23_08-41-00.mp4";
import vid2 from "../assets/video_2026-01-23_08-41-23.mp4";
import vid3 from "../assets/video_2026-01-23_08-41-30.mp4";

const VideoGallery = () => {
  const videos = [vid1, vid2, vid3];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[9/16] group"
            >
              <video
                src={vid}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
