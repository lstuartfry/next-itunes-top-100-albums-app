import { fetchTopAlbums } from "@/actions";
import AlbumListItem from "./AlbumListItem";

export default async function AlbumList() {
  const albumsData = await fetchTopAlbums();
  return (
    <ol className="flex flex-col">
      {albumsData.feed.entry.map((album, index) => (
        <AlbumListItem key={album.id.label} album={album} index={index} />
      ))}
    </ol>
  );
}
