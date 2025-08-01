import MainToolbar from '@/components/shell/MainToolbar';

export default function HomePage() {
  return (
    <div>
      <MainToolbar />
      <div style={{ padding: '20px' }}>
        <h1>Welcome to CrowdCompute</h1>
        <p>Please select a dashboard to get started.</p>
      </div>
    </div>
  );
}