package com.mesumo.msclubs.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @JsonIgnore
    public Club getClub() {
        return club;
    }

    @JsonProperty("club")
    public void setClub(Club club) {
        this.club = club;
    }

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @JsonIgnore
    public Activity getActivity() {
        return activity;
    }

    @JsonProperty("activity")
    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "court_type")
    private CourtType court_type;

    private boolean inside;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "court")
    private Set<Slot> slots;

}