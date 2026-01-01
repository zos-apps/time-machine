import { useState } from 'react';

interface Backup {
  id: string;
  date: Date;
  size: string;
  files: number;
}

const TimeMachine: React.FC = () => {
  const [backups] = useState<Backup[]>([
    { id: '1', date: new Date(), size: '2.4 GB', files: 15420 },
    { id: '2', date: new Date(Date.now() - 86400000), size: '2.3 GB', files: 15380 },
    { id: '3', date: new Date(Date.now() - 172800000), size: '2.2 GB', files: 15200 },
  ]);
  const [isBackingUp, setIsBackingUp] = useState(false);

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 to-purple-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">⏰</div>
        <h1 className="text-3xl font-light">Time Machine</h1>
        <p className="text-gray-400 mt-2">Your files, backed up automatically</p>
      </div>

      {/* Status */}
      <div className="px-8 py-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Last Backup</div>
              <div className="text-sm text-gray-300">
                {backups[0]?.date.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => {
                setIsBackingUp(true);
                setTimeout(() => setIsBackingUp(false), 3000);
              }}
              disabled={isBackingUp}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isBackingUp ? 'Backing Up...' : 'Back Up Now'}
            </button>
          </div>
          {isBackingUp && (
            <div className="mt-4">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 px-8 py-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Backup History</h2>
        <div className="space-y-3">
          {backups.map(backup => (
            <div key={backup.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{backup.date.toLocaleDateString()}</div>
                  <div className="text-sm text-gray-400">
                    {backup.size} • {backup.files.toLocaleString()} files
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20">
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeMachine;
