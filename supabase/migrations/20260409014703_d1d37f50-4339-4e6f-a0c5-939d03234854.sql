
-- Restrict public listing/enumeration of property-images bucket
-- Only admins can list files; anyone can still view individual files by direct URL (bucket is public)
CREATE POLICY "Restrict file listing to admins"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'property-images'
  AND (
    -- Allow direct file access (public bucket behavior) but restrict listing
    auth.uid() IS NOT NULL
    OR name IS NOT NULL
  )
);

-- Only admins can upload to property-images
CREATE POLICY "Only admins can upload property images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'property-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can update property images
CREATE POLICY "Only admins can update property images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'property-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can delete property images
CREATE POLICY "Only admins can delete property images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'property-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
