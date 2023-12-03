use regex::Regex;
use anyhow::{anyhow, Result};

#[derive(Clone)]
struct Passport {
    byr: Option<String>,
    iyr: Option<String>,
    eyr: Option<String>,
    hgt: Option<String>,
    hcl: Option<String>,
    ecl: Option<String>,
    pid: Option<String>,
    cid: Option<String>,
}

impl Default for Passport {
    fn default() -> Self {
        Passport {
            byr: None, iyr: None, eyr: None, hgt: None,
            hcl: None, ecl: None, pid: None, cid: None,
        }
    }
}

fn main() {
    let input = std::fs::read_to_string("input.txt").unwrap();

    let passports: Vec<Passport> = input.trim().split("\n\n").map(parse_passport).collect();
    let num_valid = passports.into_iter().filter(|p| {
        // validate_passport(p).is_ok()
        match validate_passport(p) {
            Ok(_) => true,
            Err(e) => { println!("{}", e); false },
        }
    }).count();

    println!("Num Valid: {}", num_valid);
}

fn parse_passport(input: &str) -> Passport {
    let mut p: Passport = Passport::default();
    for entry in input.replace("\n", " ").split(" ") {
        let parts: Vec<&str> = entry.split(":").collect();
        let (label, value) = (parts[0], parts[1]);
        match label {
            "byr" => { p.byr = Some(value.to_owned()) },
            "iyr" => { p.iyr = Some(value.to_owned()) },
            "eyr" => { p.eyr = Some(value.to_owned()) },
            "hgt" => { p.hgt = Some(value.to_owned()) },
            "hcl" => { p.hcl = Some(value.to_owned()) },
            "ecl" => { p.ecl = Some(value.to_owned()) },
            "pid" => { p.pid = Some(value.to_owned()) },
            "cid" => { p.cid = Some(value.to_owned()) },
            _ => {},
        }
    }
    p
}

fn validate_passport(p: &Passport) -> Result<()> {
    check_year_range(p.clone().byr, 1920, 2002)?;
    check_year_range(p.clone().iyr, 2010, 2020)?;
    check_year_range(p.clone().eyr, 2020, 2030)?;
    check_height(p.clone().hgt)?;
    check_regex(p.clone().hcl, "#[0-9A-Fa-f]{6}")?;
    check_regex(p.clone().ecl, "^(amb|blu|brn|gry|grn|hzl|oth)$")?;
    check_regex(p.clone().pid, "^[0-9]{9}$")?;
    Ok(())
}

fn check_year_range(year_str: Option<String>, min: usize, max: usize) -> Result<()> {
    let year = year_str.ok_or(anyhow!("Missing value"))?.parse::<usize>()
        .map_err(|_e| anyhow!("Failed to parse year_str"))?;
    if year < min || year > max {
        return Err(anyhow!("Year out of range"));
    }
    Ok(())
}

fn check_height(height: Option<String>) -> Result<()> {
    let hgt = height.ok_or(anyhow!("Missing hgt"))?;

    let re = Regex::new(r"^([0-9]+)(cm|in)$").unwrap();
    let caps = re.captures(hgt.as_str()).ok_or(anyhow!("Invalid height format"))?;

    let num_str = caps.get(1).unwrap().as_str();
    let unit = caps.get(2).unwrap();

    let num = num_str.parse::<usize>().map_err(|_e| anyhow!("Failed to parse height value"))?;

    match unit.as_str() {
        "in" if num < 59 || num > 76 => { return Err(anyhow!("Height out of range")); },
        "cm" if num < 150 || num > 193 => { return Err(anyhow!("Height out of range")); },
        _ => {},
    }
    Ok(())
}

fn check_regex(field: Option<String>, re_str: &str) -> Result<()> {
    let re = Regex::new(re_str).unwrap();
    let val = field.ok_or(anyhow!("Field missing"))?;
    match re.is_match(val.as_str()) {
        true => Ok(()),
        false => Err(anyhow!(format!("Regex mismatch: {}, {}", re_str, val))),
    }
}
