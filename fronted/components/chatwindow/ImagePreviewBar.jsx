import { FiX } from "react-icons/fi";

export default function ImagePreviewBar({ imagePreview, onRemove }) {
  if (!imagePreview) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-md"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Image to send
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-red-500"
        >
          <FiX className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

