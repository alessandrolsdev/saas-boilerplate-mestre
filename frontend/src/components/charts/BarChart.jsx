import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * BarChart Component - Wrapper for Recharts Bar
 * 
 * @param {Array} data - Array of objects
 * @param {string} dataKey - Key for bar values
 * @param {string} xKey - Key for X-axis labels
 * @param {string} color - Bar color
 * @param {number} height - Chart height
 */
export default function BarChart({
    data,
    dataKey = 'value',
    xKey = 'name',
    color = '#3b82f6',
    height = 300,
    label = 'Valor'
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBar data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey={xKey} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                    }}
                />
                <Legend />
                <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} name={label} />
            </RechartsBar>
        </ResponsiveContainer>
    );
}
