
// Update ProductSwitcher mapping to include specific component path
export function getProductPath(productId) {
    const paths = {
        'finance': '/finance-dashboard',
        'beauty': '/beauty/dashboard',
        'gym': '/gym/dashboard'
    };
    return paths[productId] || '/';
}
