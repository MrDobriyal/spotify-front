'use client';
import { useAudio } from '@/context/AudioContext';
import Songs from '@/components/Songs';

export default function LibraryPage() {
  const { queue } = useAudio(); // Assuming `queue` is exposed from context

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Library</h1>
      {queue.length > 0 ? (
        <Songs audios={queue} />
      ) : (
        <p className="text-gray-500">Your library is empty. Start adding songs!</p>
      )}
    </div>
  );
}