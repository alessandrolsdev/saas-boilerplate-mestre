import { User } from 'lucide-react';

export default function MemberCard({ member }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-900">Member Name</h3>
                <p className="text-sm text-gray-500">Premium Plan</p>
            </div>
        </div>
    );
}
