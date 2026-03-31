# Storage Setup Instructions

The application requires a Supabase Storage bucket for file uploads. Follow these steps:

## 1. Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to Storage section
3. Click "Create a new bucket"
4. Name it: `assignments`
5. Set as **Public bucket** (for easy file access)
6. Click Create

## 2. Set Bucket Policies

Go to Storage > Policies and add these policies for the `assignments` bucket:

### Allow authenticated uploads
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assignments');
```

### Allow public reads
```sql
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'assignments');
```

### Allow users to update own files
```sql
CREATE POLICY "Allow users to update own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'assignments' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Allow users to delete own files
```sql
CREATE POLICY "Allow users to delete own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'assignments' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Alternative: Quick Setup via Supabase Dashboard

1. Storage > assignments bucket > Policies
2. Click "New Policy"
3. Use the policy templates above
4. Or set permissions manually in the UI

## Verification

Test the setup by:
1. Sign in as a student
2. Go to Assignments
3. Try to submit a file
4. File should upload successfully

If you get permission errors, check that:
- Bucket exists and is named `assignments`
- Bucket is set to Public
- All policies are created correctly
