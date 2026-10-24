import { permanentRedirect } from 'next/navigation'

// Preserve old links while sending every buyer to the current one-product flow.
export default function CatalogPage() {
  permanentRedirect('/join')
}
