export default function Dashboard({ tracks }: { tracks: unknown[] }) {
  return (
    <pre>{JSON.stringify(tracks, null, 2)}</pre>
  );
}
