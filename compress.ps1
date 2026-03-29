Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\hanar\Downloads\muhammad-aya-main\rana\public\invitation-design.png")
$img.Save("c:\Users\hanar\Downloads\muhammad-aya-main\rana\public\invitation-design-thumb.jpeg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
