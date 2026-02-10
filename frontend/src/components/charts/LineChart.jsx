import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * LineChart Component - Wrapper for Recharts Line
 * 
 * @param {Array} data - Array of objects
 * @param {string} dataKey - Key for line values
 * @param {string} xKey - Key for X-axis labels
 * @param {string} color - Line color
 * @param {number} height - Chart height
 */
export default function LineChart({
    data,
    dataKey = 'value',
    xKey = 'name',
    color = '#10b981',
    height = 300,
    label = 'Valor'
}) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsLine data={data}>
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
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={3}
                    dot={{ fill: color, r: 5 }}
                    activeDot={{ r: 7 }}
                    name={label}
                />
            </RechartsLine>
        </ResponsiveContainer>
    );
}
