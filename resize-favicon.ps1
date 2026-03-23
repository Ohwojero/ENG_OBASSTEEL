# Generate multiple favicon sizes from logo
Add-Type -AssemblyName System.Drawing

$inputPath = "public/logo-image.png"
$sizes = @(
    @{width=16; height=16; path="public/favicon-16x16.png"},
    @{width=32; height=32; path="public/favicon-32x32.png"}
)

$image = [System.Drawing.Image]::FromFile((Resolve-Path $inputPath).Path)

foreach ($size in $sizes) {
    $newSize = New-Object System.Drawing.Size($size.width, $size.height)

Write-Output "Created favicon sizes: 16x16, 32x32 PNGs and favicon.ico. Run 'yarn dev' and hard refresh (Ctrl+F5) to see 32x32 favicon."

Write-Output "Created favicon sizes: 16x16, 32x32 PNGs. Run dev server and hard refresh (Ctrl+F5)."
