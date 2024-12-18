import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { fetchAlbum } from "@/actions";
import AlbumTrack from "./AlbumTrack";

export default async function AlbumShow({ albumId }: { albumId: string }) {
  const { results } = await fetchAlbum(albumId);
  // the first result from the query will always belong to the album/collection
  const [albumMetadata, ...albumTracks] = results;

  // ex: January 1st, 2025
  const formattedReleaseDate = format(
    new Date(albumMetadata.releaseDate),
    "LLLL do, yyyy"
  );

  return (
    <div className="pt-12 flex flex-col lg:justify-center items-center gap-4 lg:gap-12 p-4 text-white">
      <Image
        src={albumMetadata.artworkUrl100}
        height={200}
        width={200}
        alt={`${albumMetadata.collectionName} album cover`}
        style={{
          borderRadius: "12px",
        }}
      />
      <div className="flex flex-col gap-2 whitespace-nowrap items-center">
        <Link
          href={albumMetadata.collectionViewUrl}
          target="_blank"
          className="lg:text-3xl text-xl font-semibold underline"
        >
          {albumMetadata.collectionName}
        </Link>
        <span>{albumMetadata.artistName}</span>
        <span>{`${albumMetadata.trackCount} ${
          albumMetadata.trackCount > 1 ? "tracks" : "track"
        }`}</span>
        <span>{formattedReleaseDate}</span>
      </div>
      <div className="bg-black/40 text-white flex flex-col space-y-6 mt-6">
        {albumTracks.map((track, index) => (
          <Link
            href={track.trackViewUrl}
            target="_blank"
            className="flex gap-3 hover:bg-secondary px-3 py-1 rounded-xl"
            key={track.trackId}
          >
            <span className="font-semibold lg:text-xl">{index + 1}</span>
            <AlbumTrack track={track} />
          </Link>
        ))}
      </div>
    </div>
  );
}
