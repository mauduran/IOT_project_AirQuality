This driver can calculate many gases which can be configured at 
bsec_virtual_sensor_t sensorList[10] = {
    BSEC_OUTPUT_RAW_TEMPERATURE,
    BSEC_OUTPUT_RAW_PRESSURE,
    BSEC_OUTPUT_RAW_HUMIDITY,
    BSEC_OUTPUT_RAW_GAS,
    BSEC_OUTPUT_IAQ,
    BSEC_OUTPUT_STATIC_IAQ,
    BSEC_OUTPUT_CO2_EQUIVALENT,
    BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };


In order to run this code, it is necessary to add the library BSEC to your environment.
This file can be found at C:\Users\username\AppData\Local\Arduino15\packages\esp32\hardware\esp32\2.0.1

Follow the instructions on https://github.com/BoschSensortec/BSEC-Arduino-library#installation-and-getting-started to install the library.
The basic changes are:

Add the compiler.libraries.ldflags on the combine recipe:


=========================================================	
# These can be overridden in platform.local.txt		|
compiler.c.extra_flags=					|
compiler.c.elf.extra_flags=				|
#compiler.c.elf.extra_flags=-v				|
compiler.cpp.extra_flags=				|
compiler.S.extra_flags=					|
compiler.ar.extra_flags=				|
compiler.elf2hex.extra_flags=				|
compiler.libraries.ldflags=				|
=========================================================

And also add the declaration {compiler.libraries.ldflags} at the gc-sections

## Combine gc-sections, archives, and objects
recipe.c.combine.pattern="{compiler.path}{compiler.c.elf.cmd}" {compiler.c.elf.flags} {compiler.c.elf.extra_flags} {compiler.libraries.ldflags} -Wl,--start-group {object_files} "{archive_file_path}" {compiler.c.elf.libs} {compiler.libraries.ldflags} {build.extra_libs} -Wl,--end-group -Wl,-EL -o "{build.path}/{build.project_name}.elf"
