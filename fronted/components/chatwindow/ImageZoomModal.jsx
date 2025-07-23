import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ImageZoomModal({ zoomImageUrl, onClose }) {
  if (!zoomImageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={zoomImageUrl}
          alt="Zoomed"
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-lg"
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold"
        >
          <FiX className="w-8 h-8" />
        </button>

        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={async () => {
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: "Chat Image",
                    url: zoomImageUrl,
                  });
                } else {
                  toast.warning("Sharing is not supported in your browser.");
                }
              } catch (err) {
                toast.error("share failed");
              }
            }}
            className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 text-sm font-medium"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
