async function resolveHandle(handle: string) {
  const res = await fetch(`https://${handle}/.well-known/atproto-did`)
  const did = await res.text()
  assert(typeof did === 'string' && did.startsWith('did:'))
  return did
}
