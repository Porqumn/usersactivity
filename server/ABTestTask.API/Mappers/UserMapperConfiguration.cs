using System;
using AbTestTask.DAL.Models;
using AutoMapper;

namespace ABTestTask.API.Mappers
{
    public class UserMapperConfiguration : Profile
    {
        public UserMapperConfiguration()
        {
            CreateMap<UserDto, User>()
                .ForMember(user => user.RegistrationDate,
                    opt => opt.MapFrom(userDto => IsDate(userDto.RegistrationDate)
                        ? DateTime.Parse(userDto.RegistrationDate)
                        : default(DateTime)))
                .ForMember(user => user.LastActivityDate,
                    opt => opt.MapFrom(userDto => IsDate(userDto.LastActivityDate)
                        ? DateTime.Parse(userDto.LastActivityDate)
                        : default(DateTime)));
        }

        private bool IsDate(string value)
        {
            return DateTime.TryParse(value, out DateTime _);
        }
    }
}