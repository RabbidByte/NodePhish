$userArrayCOMPANY = @("user1", "user2", "user3", "user4")

foreach ($element in $userArrayDIRTT) {
	Get-ADUser $element -properties passwordLastSet | Format-List | findstr /i "Distinguish PasswordLastSet"
}
