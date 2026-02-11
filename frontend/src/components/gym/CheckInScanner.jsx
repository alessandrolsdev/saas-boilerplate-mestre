import { QrCode } from 'lucide-react';

export default function CheckInScanner() {
    return (
        <div className="bg-black/90 p-8 rounded-xl aspect-square flex flex-col items-center justify-center text-white">
            <QrCode className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-sm opacity-70">Camera Preview</p>
        </div>
    );
}
