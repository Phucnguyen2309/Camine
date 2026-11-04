import PackShot from './PackShot.jsx'

/**
 * Ảnh sản phẩm: dùng ảnh chụp thật nếu sản phẩm có `image`,
 * nếu không thì vẽ bao bì SVG (PackShot).
 * view: 'front' (ảnh chính) | 'zoom' (cận cảnh hũ) | 'facts' (bảng dinh dưỡng)
 */
export default function ProductImage({ product, view = 'front', size = 150, weight, className = '', fit = 'cover' }) {
  if (view === 'facts' || !product.image) {
    return <PackShot product={product} view={product.image ? 'facts' : view} size={size} weight={weight} />
  }
  // fit="contain": hiện trọn ảnh, phần trống phía sau là chính ảnh đó làm mờ
  if (fit === 'contain' && view === 'front') {
    return (
      <span className="pimg-fit">
        <img src={product.image} alt="" aria-hidden className="pimg pimg--blur" />
        <img src={product.image} alt={product.name} className="pimg pimg--contain" />
      </span>
    )
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      className={'pimg' + (view === 'zoom' ? ' pimg--zoom' : '') + (className ? ' ' + className : '')}
    />
  )
}
