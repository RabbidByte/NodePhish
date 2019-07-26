##Random String function
function generateString {
    $string = -join ((65..90) + (97..122) | Get-Random -Count 50 | % {[char]$_})
    return $string
}

$theReport = "phishusers.csv"
$theHeader = "Name, Email, ID"
Add-Content $theReport $theHeader

##Get the users for DOMAIN
$objUsers = get-aduser -filter {EmailAddress -like '*@DOMAIN.com' -AND enabled -eq $true} -server domaincontroller.DOMAIN.com -Properties EmailAddress
Foreach ($record in $objUsers) {
    $curName = $record.Name
    $curEmail = $record.EmailAddress
    $curID = generateString
    $curContent = $curName+","+$curEmail+","+$curID
    Add-Content $theReport $curContent
}
