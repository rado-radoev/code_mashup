# dim screen after 9 PM
0 21 * * * echo 32 > /sys/class/backlight/rpi_backlight/brightness >/dev/null 2>&1

# go to full brightness at 9 AM
0 9 * * * echo 255 > /sys/class/backlight/rpi_backlight/brightness >/dev/null 2>&1

# turn screen off at 1 AM
0 1 * * * echo 1 > /sys/class/backlight/rpi_backlight/bl_power >/dev/null 2>&1

# turn screen back on at 9 AM
0 9 * * * echo 0 > /sys/class/backlight/rpi_backlight/bl_power >/dev/null 2>&1